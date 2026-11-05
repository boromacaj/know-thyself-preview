/*
 * THE FIVE PHASES, AS A SYMBOLIC LAYER AND NOTHING ELSE.
 *
 * The five base-archetype phase units carried about sixty words each and no
 * depth underneath them, which left the wu xing - the frame the whole BaZi
 * pillar is built on - thinner than any single Day Master reading sitting on
 * top of it.
 *
 * WHICH FIELDS, AND WHY THESE
 *
 *   coreCharacter      the movement itself: season, direction, what the phase
 *                      DOES, which is the only definition that is not circular
 *   relationships      the generating and controlling cycles - which is exactly
 *                      what a phase's relationships ARE. A phase has no
 *                      character apart from what it feeds and what it checks
 *   emotionalPattern   the classical emotional correspondence, as symbolism
 *   practicalGuidance  the environmental rhythm: when this phase is at home in
 *                      a year and what that suggests about pacing
 *
 * THE MEDICAL LINE, HELD DELIBERATELY
 * The organ correspondences exist in the engine's own correspondence table and
 * are NOT repeated here. Nothing in this file names an organ, a symptom, a
 * treatment or a remedy, and nothing suggests that a chart says anything about
 * a body. Colour and taste are likewise left where they belong - in the
 * correspondence table, framed as tradition - because in a reading they invite
 * exactly the prescriptive move this project refuses to make.
 *
 * What is here is movement, season, relation and rhythm: the parts of the wu
 * xing that describe a pattern of behaviour rather than a state of health. The
 * TCM safety suite scans the correspondence layer; this file is written to pass
 * the same reading if it is ever pointed here.
 */
/** Keyed by phase, matching the `bazi:five-element:<phase>:base-archetype` units. */
export const FIVE_PHASE_PORTRAITS = {
    wood: {
        coreCharacter: ['Wood is the upward and outward movement - the phase of spring and of the '
                + 'east, and the one the classical sequence starts from. Its verb is expansion into space '
                + 'that was not previously occupied: growth, initiative, the push through whatever was in '
                + 'the way. Where a chart carries a lot of it, that push is the first thing the chart shows.'],
        relationships: ['Wood is fed by Water and feeds Fire, so it sits between what reflects and '
                + 'what expresses - a phase that turns depth into visible movement. It is checked by Metal, '
                + 'which prunes, and it checks Earth, which it breaks open. Those two are the whole of what '
                + 'keeps growth from becoming sprawl, and a chart with plenty of Wood and little Metal has '
                + 'the growth and not the editor.'],
        emotionalPattern: ['The tradition pairs Wood with anger, and reads it symbolically rather '
                + 'than as a temperament: the feeling of a movement meeting an obstruction. Understood that '
                + 'way it is neither a fault nor a diagnosis - it is what expansion feels like when it is '
                + 'blocked, and it tends to be sharpest in exactly the people who have most to expand.'],
        practicalGuidance: ['Wood is at home in spring and in the first part of anything, which is a '
                + 'statement about pacing rather than about calendars. Work that has a beginning in it '
                + 'suits this phase and work that is mostly maintenance does not, and a year arranged with '
                + 'nothing to start in it will feel wrong here long before the reason is obvious.'],
    },
    fire: {
        coreCharacter: ['Fire is the rising and radiating movement - the phase of summer and of the '
                + 'south, and the most visible of the five. Its verb is display: warmth, expression, the '
                + 'making of something apparent to other people. Unlike Wood it is not going anywhere; it '
                + 'is being somewhere, at maximum.'],
        relationships: ['Fire is fed by Wood and feeds Earth, so it converts growth into something '
                + 'that settles - which is why a chart with Fire and no Earth produces brilliance that '
                + 'leaves no deposit. It is checked by Water, which cools, and it checks Metal, which it '
                + 'softens enough to be worked. Water is the relation that matters most: without it the '
                + 'phase burns its own fuel faster than anything replaces it.'],
        emotionalPattern: ['The classical pairing is joy, and it is worth reading precisely. The '
                + 'tradition means elation and its overspill rather than contentment - the state that lifts '
                + 'a room and, held too long, empties the person producing it. As symbolism it describes a '
                + 'rhythm rather than a mood, and it is the reason the phase is associated with peaks '
                + 'instead of plateaus.'],
        practicalGuidance: ['Fire is at home at the height of things - midsummer, the middle of a '
                + 'project, the part that is visible. What it needs from a year is a fallow stretch it did '
                + 'not have to earn, because this phase does not schedule its own recovery and tends not '
                + 'to notice the need until the reserve is gone.'],
    },
    earth: {
        coreCharacter: ['Earth is the settling and centring movement - the phase of the transitions '
                + 'between seasons and of the centre rather than a compass point. Its verb is holding: '
                + 'receiving what arrives, giving it a place, and staying put while other things move. It '
                + 'is the only one of the five that is defined by not going anywhere.'],
        relationships: ['Earth is fed by Fire and feeds Metal, so it stands between what expresses '
                + 'and what refines - the phase where enthusiasm becomes something that can be shaped. It '
                + 'is checked by Wood, which breaks compacted ground open, and it checks Water, which it '
                + 'contains. A chart heavy in Earth with no Wood has the stability and nothing that will '
                + 'disturb it, which is how a settled position becomes a stuck one.'],
        emotionalPattern: ['The tradition pairs Earth with worry, understood as thought that circles '
                + 'rather than resolves. Read symbolically it is what holding looks like from the inside: '
                + 'the phase that takes things on does not have a natural mechanism for setting them down, '
                + 'so what it carries goes round. It describes a pattern of attention and nothing more.'],
        practicalGuidance: ['Earth is at home in the joints of the year rather than in any one season '
                + '- the transitions, the endings that are also beginnings. What it asks for practically is '
                + 'an explicit stopping point, because this phase does not generate one: work that runs '
                + 'until somebody says it is finished will run indefinitely here.'],
    },
    metal: {
        coreCharacter: ['Metal is the contracting and separating movement - the phase of autumn and '
                + 'of the west. Its verb is cutting: deciding what stays and what goes, and giving a thing '
                + 'a definite edge. Where the other phases add, Metal removes, and that is not a lesser '
                + 'operation - nothing acquires a shape without it.'],
        relationships: ['Metal is fed by Earth and feeds Water, so it sits between what accumulates '
                + 'and what reflects - the phase that turns a mass of material into something distilled. It '
                + 'is checked by Fire, which softens it enough to be worked, and it checks Wood, which it '
                + 'prunes. Fire is the important relation: Metal with no Fire keeps its standards and loses '
                + 'the warmth that made them bearable to be near.'],
        emotionalPattern: ['The classical pairing is grief, and it follows directly from the '
                + 'movement rather than being an extra claim. A phase whose work is separation carries the '
                + 'feeling that separation produces. As symbolism it says something useful about autumn '
                + 'temperaments: the capacity to let go cleanly and the cost of having done it often.'],
        practicalGuidance: ['Metal is at home in autumn and at the end of things - the harvest, the '
                + 'edit, the closing of an account. What it wants from a year is a real ending at intervals '
                + 'rather than a continuous middle, and a stretch with nothing ever finished in it wears '
                + 'this phase down.'],
    },
    water: {
        coreCharacter: ['Water is the descending and pervading movement - the phase of winter and of '
                + 'the north. Its verb is finding the way through: it does not push like Wood or display '
                + 'like Fire, it goes around, downward, and into whatever is open. It is also the phase of '
                + 'storage, which is why the tradition puts it at the end of the cycle and at the point '
                + 'where the next one is prepared.'],
        relationships: ['Water is fed by Metal and feeds Wood, so it stands between what distils and '
                + 'what grows - the phase where what was learned becomes what happens next. It is checked '
                + 'by Earth, which gives it banks, and it checks Fire, which it cools. Earth is the '
                + 'relation to watch: Water with no Earth has depth and no channel, and goes in several '
                + 'directions with nothing held.'],
        emotionalPattern: ['The tradition pairs Water with fear, meant as the alertness of something '
                + 'that survives by knowing what is coming rather than by confronting it. Taken as '
                + 'symbolism it is close to watchfulness, and it explains why the phase is associated with '
                + 'both unusual perceptiveness and a reluctance to be pinned down.'],
        practicalGuidance: ['Water is at home in winter and in the fallow part of any cycle, which '
                + 'the modern working year makes almost no room for. What this phase needs practically is '
                + 'time that is not producing anything and is not framed as recovery from something - the '
                + 'reflection is the work, and it is the one part of the cycle that cannot be hurried.'],
    },
};
