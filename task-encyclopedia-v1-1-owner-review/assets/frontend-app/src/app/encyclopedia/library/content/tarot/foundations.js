export const ARTICLES = [
    {
        id: 'tarot.foundations.what-tarot-is',
        library: 'tarot',
        category: 'foundations',
        title: 'What Tarot Is',
        summary: 'A seventy-eight-card deck that began as an Italian card game and became, from the late eighteenth century, a set of images for reflection. The app uses the Rider–Waite–Smith deck of 1909.',
        keywords: ['tarocchi', 'trionfi', 'Rider–Waite–Smith', 'A. E. Waite', 'Pamela Colman Smith', 'cartomancy', 'history of tarot'],
        sections: [
            {
                id: 'origins',
                heading: 'From card game to divination',
                paragraphs: [
                    'Playing cards reached Europe in the late fourteenth century, most likely modelled on Mamluk packs from Egypt. Some decades later, at the courts of Milan and Ferrara, a series of allegorical picture cards and a Fool were added to the four ordinary suits. These were the trionfi, or triumphs, and the deck that carried them came to be called tarocchi; the earliest written mention dates from 1440, and the oldest surviving cards are the hand-painted Visconti-Sforza packs of the mid-fifteenth century. Their purpose was a trick-taking game in which the picture cards outranked everything else, and versions of that game are still played in France and central Europe.',
                    'The divinatory tarot is a later invention, and historians of the game, Michael Dummett above all, found no real evidence of fortune-telling with these cards before the late eighteenth century. In 1781 the French scholar Antoine Court de Gébelin argued, without evidence, that the trumps preserved the wisdom of ancient Egypt. Within a decade the Parisian cartomancer Etteilla had issued a deck designed for fortune-telling. Through the nineteenth century, occultists such as Éliphas Lévi tied the twenty-two trumps to the twenty-two letters of the Hebrew alphabet, and the Hermetic Order of the Golden Dawn, founded in London in 1888, rebuilt that scheme with its own letter order and a detailed set of astrological and elemental correspondences.',
                ],
            },
            {
                id: 'rider-waite-smith',
                heading: 'The Rider–Waite–Smith deck',
                paragraphs: [
                    'The deck the app uses was published in London by William Rider & Son in December 1909. Its designer was Arthur Edward Waite, who had belonged to the Golden Dawn since the 1890s and by then led a branch of it of his own, and its artist was Pamela Colman Smith, a fellow member, an illustrator and a designer of costumes and sets for the theatre. Waite explained the cards in a small Key to the Tarot issued with the deck and then, in 1911, in the enlarged Pictorial Key to the Tarot, which reproduced all seventy-eight of Smith’s drawings.',
                    'Smith’s decisive contribution was to give every numbered card of the four suits a scene with people in it. Most earlier decks showed the Five of Cups as five cups and nothing more. The idea had one notable forerunner: the Sola Busca tarot of about 1490 illustrated all its pip cards, and photographs of it reached the British Museum in 1907; Waite himself wrote that his illustrated minors were the first in modern times but not in all times. Because the Rider–Waite–Smith minors can be read as pictures, beginners could interpret them without memorised tables, and a great many later decks were drawn on her model. The deck also published, for a wide audience, the Golden Dawn’s reordering of two trumps, with Strength at VIII and Justice at XI, the convention this library follows.',
                ],
            },
            {
                id: 'reflective-tool',
                heading: 'Tarot as a reflective tool',
                paragraphs: [
                    'Within this app a reading is treated as structured reflection. The draw is random, and the cards supply a vocabulary of situations, attitudes and turning points that a question can be thought through with. A card placed in a position that looks ahead is read as the direction a present pattern tends towards, not as an event that has been fixed.',
                    'That framing is not a modern softening of something once literal. Waite himself was dismissive of the fortune-telling meanings he printed, calling the attachment of fortune-telling to the trumps a long impertinence, and the richest layer of the deck has always been its imagery. The [[tarot.foundations.structure-of-the-deck|structure of the deck]] and the [[tarot.foundations.positions-and-spreads|logic of positions]] are what turn seventy-eight pictures into a reading; the wider place of tarot among the app’s systems is set out in [[synthesis.pillar.tarot]].',
                ],
            },
        ],
        related: ['tarot.foundations.structure-of-the-deck', 'tarot.foundations.reversals', 'tarot.major.fool', 'synthesis.pillar.tarot', 'synthesis.guide.symbolic-frameworks'],
    },
    {
        id: 'tarot.foundations.structure-of-the-deck',
        library: 'tarot',
        category: 'foundations',
        title: 'The Structure of the Deck',
        summary: 'Seventy-eight cards in two parts: twenty-two Major Arcana numbered 0 to XXI, and fifty-six Minor Arcana in four suits of fourteen.',
        keywords: ['Major Arcana', 'Minor Arcana', 'trumps', 'pips', 'court cards', '78 cards', 'Strength VIII', 'Justice XI'],
        sections: [
            {
                id: 'two-parts',
                heading: 'Major and Minor Arcana',
                paragraphs: [
                    'The deck divides into two unequal parts. The Major Arcana are twenty-two named picture cards, the descendants of the old trump series. The Minor Arcana are fifty-six cards arranged like an ordinary pack: four suits, each running from Ace to Ten and then through four court cards. The word arcana, Latin for secrets, belongs to the occult literature of the nineteenth and early twentieth centuries, and Waite’s own book still heads the series as the Trumps Major, otherwise Greater Arcana; the card players who used the deck first simply called the picture cards triumphs, and many still say trumps.',
                    'Readers usually treat the two parts as working at different scales. A Major names a broad movement or principle, such as an ending, a test of nerve or a period of recovery. A Minor names how that kind of thing shows up in a particular area of life and at a particular stage. Neither is more true than the other; they answer different questions.',
                ],
            },
            {
                id: 'major-order',
                heading: 'The order of the Major Arcana',
                paragraphs: [
                    'The app numbers the Majors in the Rider–Waite–Smith order: [[tarot.major.fool]] at 0, then The Magician I through The World XXI. The one point that differs from older decks concerns two cards. The Marseille tradition puts Justice at VIII and Strength at XI, and so did MacGregor Mathers’s public handbook of 1888. Inside the Golden Dawn the order was different. The order laid the trumps along the Hebrew alphabet from the Fool onwards and gave each letter its traditional sign; Teth, the letter of Leo, then falls on the eighth trump and Lamed, the letter of Libra, on the eleventh, so the lion card and the scales card changed places. Waite’s deck adopted the change, though his book refused to explain it, saying only that the reasons satisfied him. In this deck [[tarot.major.strength]] is VIII and [[tarot.major.justice]] is XI.',
                    'The Fool carries the number zero and therefore sits both outside the sequence and at its start. Where it belongs was argued over for a century: Court de Gébelin put it first, Lévi placed it between XX and XXI and gave it the letter Shin, and the Golden Dawn moved it to the head of the series with Aleph. Waite still discusses it between Judgement and The World, but his deck prints a plain 0. Much modern teaching reads the remaining twenty-one cards as the stations that figure passes through.',
                ],
            },
            {
                id: 'minor-structure',
                heading: 'The four suits',
                list: [
                    '[[tarot.suit.wands|Wands]]: Fire; drive, initiative and enterprise.',
                    '[[tarot.suit.cups|Cups]]: Water; feeling, relationship and imagination.',
                    '[[tarot.suit.swords|Swords]]: Air; thought, speech, conflict and decision.',
                    '[[tarot.suit.pentacles|Pentacles]]: Earth; work, money, the body and material conditions.',
                ],
            },
            {
                id: 'ranks',
                heading: 'Pips and courts',
                paragraphs: [
                    'Within each suit the ten numbered cards, often called pips, trace a progression from a first seed to a full and sometimes overloaded result; the article on [[tarot.foundations.numbers-in-the-minor-arcana]] follows it step by step. The four [[tarot.foundations.court-cards|court cards]], Page, Knight, Queen and King, describe ways of holding the suit rather than stages of it. Historically the tarot was built the other way round from how it is often described: an ordinary suited pack of the time, with a trump series and a Fool added to it, not a deck from which the playing-card pack was later cut down.',
                ],
            },
        ],
        related: ['tarot.foundations.what-tarot-is', 'tarot.foundations.numbers-in-the-minor-arcana', 'tarot.foundations.court-cards', 'tarot.major.world', 'tarot.suit.wands'],
    },
    {
        id: 'tarot.foundations.reversals',
        library: 'tarot',
        category: 'foundations',
        title: 'Reversals',
        summary: 'A card that lands upside down is read as reversed. The app supports both orientations, and treats a reversal as an alteration of the card’s meaning rather than its opposite.',
        keywords: ['reversed cards', 'inverted cards', 'upright', 'orientation', 'ill-dignified'],
        sections: [
            {
                id: 'what-a-reversal-is',
                heading: 'What a reversal is',
                paragraphs: [
                    'When cards are shuffled with some turned end over end, a few will come up inverted. Many readers give such a card a separate reversed reading; others ignore orientation entirely and read every card upright. The Rider–Waite–Smith deck supports both practices, and so does the app: each of the seventy-eight cards can be drawn upright or reversed.',
                    'The sources say less than one might expect. MacGregor Mathers in 1888 told the inquirer to shuffle with two aims, turning some cards upside down and changing their order, and Waite repeated the instruction in one sentence of an alternative method; neither gives a proportion. Waite prints a reversed meaning for every card but never explains how a reversal should alter a reading, and his preferred method, the ten-card Celtic Cross, does not mention orientation at all. How often reversals appear is therefore a choice, not a fact of the tradition.',
                ],
            },
            {
                id: 'not-an-opposite',
                heading: 'Not simply the opposite',
                paragraphs: [
                    'The commonest beginner’s rule, that a reversed card means the reverse of its upright sense, does not survive contact with the source. Several of Waite’s reversed meanings are more favourable than the upright ones: the reversed Empress brings light and the unravelling of tangled matters, the reversed Hierophant concord. For The Sun and The Tower he gives the same meaning in a lesser degree, and for the [[tarot.wands.four|Four of Wands]] he states that the meaning does not change at all. A reversal is better understood as a change in how the card’s theme is operating.',
                ],
            },
            {
                id: 'ways-of-reading',
                heading: 'The main ways reversals are read',
                paragraphs: [
                    'Twentieth-century practice filled the gap with methods of its own; Mary K. Greer’s handbook of 2002 catalogues about a dozen, from blocked and delayed to projected and overdone. The commonest are these.',
                ],
                list: [
                    'Blocked: the card’s movement is present but stalled. A reversed Chariot is a course that will not hold; a reversed Death, an ending that is resisted.',
                    'Internal: the theme turns inward and becomes private. A reversed Tower can describe upheaval that is felt rather than seen.',
                    'Excess or deficiency: too much or too little of the upright quality. A reversed Emperor can be rigid control or an absence of structure.',
                    'Delayed: the same meaning, arriving later or at lower strength.',
                    'Exposed: for cards whose upright sense is hidden or inward, reversal can bring the matter into the open, as with a reversed [[tarot.major.devil|Devil]] whose chain is finally noticed.',
                ],
            },
            {
                id: 'in-the-app',
                heading: 'How the app handles them',
                paragraphs: [
                    'The app does not apply one rule to every card. It works with six alterations, each named in the vocabulary of Waite’s own reversed lists: diminished, blocked, overdone, turned inward, brought into the open, and unchanged. Each card is given the one that fits its own structure: a card that pushes outward tends to be read as turned inward when reversed, a card already at full stretch as overdone, a card that keeps something hidden as having it surface, and a card with nothing more specific to say as the same thing at lower volume. Unchanged is kept for the Four of Wands alone, the one card for which Waite says so outright. The reversed reading always keeps the card’s subject. A reversed [[tarot.major.star|Star]] is still about hope, only hope that is thinning.',
                    'Because the sources give no proportion, how often a card comes up reversed in the app is a setting chosen for the product, not a figure taken from the tradition.',
                ],
            },
        ],
        related: ['tarot.foundations.reading-cards-together', 'tarot.foundations.positions-and-spreads', 'tarot.major.devil', 'tarot.major.tower', 'tarot.wands.four'],
    },
    {
        id: 'tarot.foundations.positions-and-spreads',
        library: 'tarot',
        category: 'foundations',
        title: 'Positions and Spreads',
        summary: 'A spread is a set of places, each asking the card laid in it a different question. The same card means different things in different positions.',
        keywords: ['spread', 'layout', 'position', 'Celtic Cross', 'three-card spread'],
        sections: [
            {
                id: 'what-a-position-does',
                heading: 'What a position does',
                paragraphs: [
                    'A card on its own names a theme. Placed in a spread, it becomes the answer to a specific question. [[tarot.major.hermit|The Hermit]] in a position about the past suggests a withdrawal that still shapes things; in a position about a useful response, it suggests stepping back now; in a position about another person, it describes how that person appears from the outside. The card has not changed. The question has.',
                    'This is why reading begins with the layout. Before any card is turned, each place should already be clear: what it asks, what kind of answer would fit, and how it relates to the places around it.',
                ],
            },
            {
                id: 'good-positions',
                heading: 'What makes a position sound',
                paragraphs: [
                    'The app holds its positions to three standards. Each is neutral, naming a place to look rather than presupposing what will be found. Each is distinct, so no two positions in one spread ask the same thing. Each is specific enough that a reader knows what to look for. A position that looks ahead is phrased as a tendency of the current pattern, never as a settled outcome.',
                    'Order matters as well. In most spreads the positions are read in sequence, each acting on the next, so swapping two cards between places produces a different reading of the same draw. Some layouts are read differently: two options weighed against a deciding factor, or parallel layers compared for balance.',
                ],
            },
            {
                id: 'the-app-spreads',
                heading: 'The spreads in the app',
                paragraphs: [
                    'The daily draw uses [[tarot.spread.daily-three-card|a three-card spread]] of Energy, Factor and Guidance. Guided Tarot starts from a choice instead of typed text: seven areas of life with four intentions each, and every intention reads through one of nine three-card spreads from the app’s library, with the places renamed in the intention’s own words. A choice between two paths uses [[tarot.spread.option-a-b-guidance]], the current state of a relationship uses [[tarot.spread.self-other-relationship]], and a look at strengths uses [[tarot.spread.resources-view]]. The library also holds a single-card layout and a steadying layout meant for written questions, which the present interface does not offer.',
                    'Larger traditional layouts exist, the best known being the ten-card Celtic Cross that Waite published, built around a significator card chosen to stand for the inquirer or the matter. Three positions are enough for most single questions and far easier to read well.',
                ],
            },
        ],
        related: ['tarot.foundations.reading-cards-together', 'tarot.spread.daily-three-card', 'tarot.spread.past-present-future', 'tarot.spread.one-card-reflection', 'synthesis.guide.reference-and-reading'],
    },
    {
        id: 'tarot.foundations.reading-cards-together',
        library: 'tarot',
        category: 'foundations',
        title: 'Reading Cards Together',
        summary: 'A spread is read as one statement, not as separate definitions. Suits, numbers, Majors and court cards all change how neighbouring cards are understood.',
        keywords: ['card combinations', 'synthesis', 'elemental dignities', 'card pairs', 'reading a spread'],
        sections: [
            {
                id: 'one-statement',
                heading: 'One statement, not three notes',
                paragraphs: [
                    'The commonest weakness in a reading is to define each card and stop. A spread earns its positions only when the cards are allowed to modify one another: the second card qualifies the first, the third answers both. The patterns below are the ones readers check before looking at any card in detail.',
                ],
            },
            {
                id: 'suits',
                heading: 'Suits in common',
                paragraphs: [
                    'Two or three cards of the same suit concentrate the reading in that suit’s area. Three Cups place the matter in feeling and relationship even when the question was about work. A spread with no cards of a suit can be just as telling: a career question answered without a single Pentacle suggests the practical side is not where the issue lies.',
                    'An older method, the elemental dignities of the Golden Dawn, weighs neighbouring suits against each other. A card between two of its own suit is strengthened, for better or worse. Wands and Cups are treated as contrary, as are Swords and Pentacles, and a card flanked by its contrary element is read as weakened; the other pairings count as friendly, so a Sword beside a Cup is not in conflict under this rule. A card lying between two cards that oppose each other is barely affected by either.',
                ],
            },
            {
                id: 'majors',
                heading: 'Majors among Minors',
                paragraphs: [
                    'A single Major in a spread of Minors tends to set the frame, with the Minors describing how that larger movement is playing out day to day. When most of the cards are Majors, readers take the matter to be structural rather than circumstantial: something about direction or principle, not a passing mood. Major does not mean decisive, though. [[tarot.major.temperance|Temperance]] beside the [[tarot.swords.five|Five of Swords]] does not overrule the conflict; it describes what the conflict lacks.',
                ],
            },
            {
                id: 'numbers',
                heading: 'Numbers repeating',
                paragraphs: [
                    'Two cards of the same rank in different suits suggest the same stage reached in two areas at once. A pair of Fives points to strain on more than one front; a pair of Aces, to beginnings. A run of low numbers leans towards the start of something, a run of high ones towards its later stages. The logic of each number is set out in [[tarot.foundations.numbers-in-the-minor-arcana]].',
                ],
            },
            {
                id: 'courts',
                heading: 'Court cards as people or roles',
                paragraphs: [
                    'Traditionally a court card could stand for an actual person, identified by age, sex or colouring; Waite’s Celtic Cross even chooses the inquirer’s card that way, by sex and by whether the person is over or under forty. Many readers now read courts as roles or manners instead: the way someone is acting, or a way of acting that is available. The app takes the second approach, since a daily draw has no list of people to match a card to. Two courts side by side often describe a relationship between two ways of behaving, for instance the cautious [[tarot.foundations.court-cards|Page]] beside the committed Knight.',
                ],
            },
        ],
        related: ['tarot.foundations.positions-and-spreads', 'tarot.foundations.court-cards', 'tarot.foundations.numbers-in-the-minor-arcana', 'tarot.foundations.reversals', 'synthesis.guide.reading-multiple-factors'],
    },
    {
        id: 'tarot.foundations.numbers-in-the-minor-arcana',
        library: 'tarot',
        category: 'foundations',
        title: 'Numbers in the Minor Arcana',
        summary: 'In each suit the numbered cards run from Ace to Ten as a sequence: a seed, its first forms, a crisis, a recovery and a full result.',
        keywords: ['pip cards', 'Ace to Ten', 'tarot numerology', 'minor arcana numbers'],
        sections: [
            {
                id: 'a-sequence',
                heading: 'A sequence, not a list',
                paragraphs: [
                    'The ten numbered cards of a suit can be read as a single story told in that suit’s terms. The rank gives the stage; the suit says what is passing through it. This is a teaching device rather than a mechanical rule, and Pamela Colman Smith drew each card as its own scene, so the [[tarot.cups.seven|Seven of Cups]] and the [[tarot.pentacles.seven|Seven of Pentacles]] share a number but very little else. Still, the progression explains a great deal about why each card looks the way it does.',
                ],
            },
            {
                id: 'the-stages',
                heading: 'The stages',
                list: [
                    'Ace: the suit in its purest and least formed state, a gift offered by a hand from a cloud.',
                    'Two: a second thing appears, and with it balance, partnership or a choice.',
                    'Three: the first visible result, often involving other people.',
                    'Four: a pause to secure what exists, which can become rest or rigidity.',
                    'Five: disruption; the stable state is lost and something has to be faced.',
                    'Six: the swing back, through help, generosity or simply moving on.',
                    'Seven: a test of position, where effort is questioned or defended.',
                    'Eight: concentrated movement or labour, for better or worse.',
                    'Nine: the suit nearly at its fullest, with what that has cost.',
                    'Ten: the cycle complete, sometimes to the point of burden.',
                ],
            },
            {
                id: 'across-suits',
                heading: 'One number across four suits',
                paragraphs: [
                    'Comparing the four cards of a rank shows how the suit colours the stage. The Fives are a clear case: in Wands, a scuffle among equals; in Cups, grief over what has been spilt; in Swords, a victory that leaves others humiliated; in Pentacles, hardship outside a lit window. All four are losses of equilibrium, but the loss is of a different kind each time.',
                    'The Tens show the same thing at the end of the sequence. The [[tarot.wands.ten|Ten of Wands]] is a load carried too far, the Ten of Cups a household at ease, the Ten of Swords a painful conclusion, and the [[tarot.pentacles.ten|Ten of Pentacles]] a settled inheritance. Completion in Fire and Air tends to be heavy; in Water and Earth, it tends to settle. The Golden Dawn’s titles for the small cards draw the same line: Strife, Loss in Pleasure, Defeat and Material Trouble for the Fives; Oppression, Perfected Success, Ruin and Wealth for the Tens.',
                ],
            },
        ],
        related: ['tarot.foundations.structure-of-the-deck', 'tarot.foundations.court-cards', 'tarot.wands.ace', 'tarot.cups.five', 'tarot.swords.ten'],
    },
    {
        id: 'tarot.foundations.court-cards',
        library: 'tarot',
        category: 'foundations',
        title: 'Court Cards',
        summary: 'Page, Knight, Queen and King: four ways of holding a suit, from first curiosity to settled authority, each traditionally given an element of its own.',
        keywords: ['court cards', 'Page', 'Knight', 'Queen', 'King', 'Princess', 'Prince', 'face cards'],
        sections: [
            {
                id: 'four-ranks',
                heading: 'Four ranks',
                paragraphs: [
                    'Each suit has four court cards after the Ten. They are notoriously the hardest cards to read, because they do not describe events or stages of a process. They describe a manner: how someone approaches the suit’s area, or how the matter itself is being handled.',
                ],
            },
            {
                id: 'stages-and-modes',
                heading: 'Stages and modes',
                list: [
                    'Page: the student or messenger. The suit is new to this figure, who handles it with curiosity and some clumsiness. Pages often signal news, a first attempt or a skill not yet tested.',
                    'Knight: the suit in pursuit. Knights commit to one direction and follow it, which makes them the most active and the most likely to overshoot. Each of the four rides differently, from the charging Knight of Swords to the stationary Knight of Pentacles.',
                    'Queen: the suit mastered from within. Queens hold their area through understanding and care for its effects on others, and their authority is felt rather than imposed.',
                    'King: the suit mastered outwardly. Kings direct, decide and take responsibility, steering the area on behalf of others.',
                ],
            },
            {
                id: 'elemental-combinations',
                heading: 'Elemental combinations',
                paragraphs: [
                    'Because each suit has an element, many readers also give each rank one, and read the court card as a meeting of two. The scheme comes from the Golden Dawn, whose four figures were a mounted Knight (Fire), a Queen (Water), a Prince in a chariot (Air) and a Princess (Earth). The Queen of Wands then becomes Water of Fire, warmth held steadily, whichever version is used.',
                    'The difficulty is matching those four to Waite’s Page, Knight, Queen and King. Aleister Crowley, publishing the order’s titles in 1912, set the Golden Dawn Knight beside the ordinary Knight and its Prince beside the King, which makes the Knight Fire and the King Air. Many later books instead equate the Golden Dawn’s senior figure with the King and its Prince with the Knight, giving the widespread modern scheme of Page Earth, Knight Air, Queen Water and King Fire. Both are in print. The app does not rely on these combinations, but they remain a useful way of explaining why the Queen of Cups and the [[tarot.cups.king|King of Cups]] handle feeling so differently.',
                ],
            },
            {
                id: 'person-or-role',
                heading: 'A person or a role',
                paragraphs: [
                    'Older handbooks matched court cards to people by age and appearance. Waite’s own rules for choosing a card to represent the inquirer use a Knight for a man of forty or more and a King for a younger man, a trace of the Golden Dawn ranking in which the Knight is the senior figure. The app reads courts as stances, and the article on [[tarot.foundations.reading-cards-together|reading cards together]] describes how they combine. In practice a court can still point to a person in a reading, but only if the question already has that person in it.',
                ],
            },
        ],
        related: ['tarot.foundations.structure-of-the-deck', 'tarot.foundations.reading-cards-together', 'tarot.wands.page', 'tarot.swords.knight', 'tarot.pentacles.queen'],
    },
];
