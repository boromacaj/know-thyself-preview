import { placementUnit } from '../astrologyAuthoring.js?v=f9ab0a6';
/**
 * URANUS, NEPTUNE AND PLUTO THROUGH THE TWELVE SIGNS.
 *
 * WRITTEN DIFFERENTLY ON PURPOSE.
 *
 * Uranus spends seven years in a sign, Neptune fourteen, Pluto between twelve
 * and thirty. Everyone born within that window shares the placement, so a
 * reading that addressed it as a personal trait would be telling a whole
 * generation the same thing about themselves and calling it a chart.
 *
 * So every entry here is written in the second person about a COHORT, and says
 * so. The prose describes the collective weather someone grew up inside rather
 * than a quality they personally possess, and the one honest personal hook -
 * that the house and the aspects are what make it individual - is stated rather
 * than implied.
 *
 * They also carry weaker provenance (see GENERATIONAL_PROVENANCE), so synthesis
 * discounts them, and the pillar composer ranks them last. All three mechanisms
 * point the same way: present, never dominant.
 */
const uranus = [
    {
        planet: 'uranus', sign: 'aries',
        headline: 'A cohort that broke things open by starting.',
        core: [
            'Uranus in Aries marks roughly seven years in which the disruptive impulse went straight at the front door. The shared instinct is that change is made by acting rather than by persuading, and the generation carrying it tends to be impatient with process in a way that is sometimes exactly right.',
            'This is a generational tone rather than a personal trait. Where it becomes yours is the house it fell in and the aspects it makes, which is where a shared restlessness turns into a specific one.',
        ],
    },
    {
        planet: 'uranus', sign: 'taurus',
        headline: 'A cohort that unsettled what money and land were assumed to be.',
        core: [
            'Uranus in Taurus applies disruption to the most change-resistant material there is: value, property, the material basis of security. The shared theme is that the things previously treated as solid turn out not to be, and the generation formed under it shares a willingness to reconsider what is actually worth holding.',
            'As with all the outer planets, this describes a period rather than a person. The individual version depends on where it sits in your chart and what it touches.',
        ],
    },
    {
        planet: 'uranus', sign: 'gemini',
        headline: 'A cohort that changed how information moved.',
        core: [
            'Uranus in Gemini disrupts communication itself - the channels, the speed, the assumption about who is allowed to speak. The shared quality is a restless, connective intelligence that is comfortable with more inputs than the previous generation thought manageable.',
            'This is collective rather than individual. The house and aspects are what make it say anything specific about you.',
        ],
    },
    {
        planet: 'uranus', sign: 'cancer',
        headline: 'A cohort that rearranged what a family was.',
        core: [
            'Uranus in Cancer unsettles home, lineage and the shape of domestic life. The shared experience is of the inherited pattern not holding, and the generation formed under it tends to build belonging deliberately rather than accept the version it was handed.',
            'Generational, not personal. What makes it yours is its house and its aspects.',
        ],
    },
    {
        planet: 'uranus', sign: 'leo',
        headline: 'A cohort that insisted on expressing itself.',
        core: [
            'Uranus in Leo puts the disruptive function on individual expression. The shared theme is a refusal to be a type - a conviction that the self is to be invented rather than inherited - and it produced a generation with real creative nerve and a certain difficulty in subordinating itself to anything.',
            'A period signature rather than a personal one. Its house and aspects are the individual part.',
        ],
    },
    {
        planet: 'uranus', sign: 'virgo',
        headline: 'A cohort that rebuilt how work gets done.',
        core: [
            'Uranus in Virgo disrupts systems, method and the daily machinery of getting things right. The shared instinct is that the existing process is probably inefficient and can be redesigned, and it points to a generation at ease with technical change.',
            'Collective weather. The house it occupies and the aspects it makes are where it becomes specific to you.',
        ],
    },
    {
        planet: 'uranus', sign: 'libra',
        headline: 'A cohort that renegotiated partnership.',
        core: [
            'Uranus in Libra puts pressure on the terms of relating - who marries whom, on what basis, and whether the arrangement has to look like the previous one. The shared theme is a genuine expectation of equality alongside real instability in how that gets arranged.',
            'This describes a period rather than a person. Its house and aspects are the personal part.',
        ],
    },
    {
        planet: 'uranus', sign: 'scorpio',
        headline: 'A cohort that broke the silence around what was hidden.',
        core: [
            'Uranus in Scorpio disrupts the private and the taboo. The shared theme is that things previously not discussed - power, money, sex, abuse - get dragged into daylight, and the generation formed under it has a real tolerance for looking directly at difficult material.',
            'Generational rather than individual. The house and aspects make it yours.',
        ],
    },
    {
        planet: 'uranus', sign: 'sagittarius',
        headline: 'A cohort that broke faith with inherited belief.',
        core: [
            'Uranus in Sagittarius unsettles doctrine, institutions and the assumed frameworks people use to decide what anything means. The shared instinct is toward a belief you arrived at yourself, and a marked resistance to being told what to hold.',
            'A period tone. Where it lands in your chart is what makes it personal.',
        ],
    },
    {
        planet: 'uranus', sign: 'capricorn',
        headline: 'A cohort that reformed the institutions it inherited.',
        core: [
            'Uranus in Capricorn applies disruption to structure, hierarchy and established authority. The shared theme is that the institutions are not fit for purpose and will have to be rebuilt rather than replaced, which leans toward reform rather than revolution.',
            'Collective, not individual. Its house and aspects are the specific part.',
        ],
    },
    {
        planet: 'uranus', sign: 'aquarius',
        headline: 'Uranus in its own sign: a cohort defined by the collective idea.',
        core: [
            'Uranus rules Aquarius, and here the disruptive function runs at full strength on its own territory: networks, ideologies, the way large numbers of people organise. The shared quality is genuine originality of outlook and a comfort with being ahead of the room.',
            'A generational signature. The house and aspects are what make it descriptive of you rather than of everyone your age.',
        ],
    },
    {
        planet: 'uranus', sign: 'pisces',
        headline: 'A cohort that unsettled the boundary between real and imagined.',
        core: [
            'Uranus in Pisces disrupts the immaterial - belief, imagination, the shared stories a culture runs on. The theme is that the line between what is real and what is constructed becomes unstable, which produces both real creativity and considerable confusion.',
            'This is a period rather than a person. Its house and aspects are where it becomes yours.',
        ],
    },
];
const neptune = [
    {
        planet: 'neptune', sign: 'aries',
        headline: 'A long generation whose ideal was the pioneer.',
        core: [
            'Neptune in Aries dissolves boundaries around action and courage. The collective ideal of the period is the one who goes first, and the corresponding blind spot is a romance about force that does not survive close inspection.',
            'Neptune spends fourteen years in a sign, so this is cultural atmosphere rather than personal character. Its house and aspects carry whatever is individual.',
        ],
    },
    {
        planet: 'neptune', sign: 'taurus',
        headline: 'A long generation that idealised material comfort.',
        core: [
            'Neptune in Taurus softens the edges around value and possession. The shared dream is of security and plenty, and the accompanying illusion is that having enough will settle something that was never actually about having enough.',
            'A fourteen-year cultural tone. The house and aspects are the personal part.',
        ],
    },
    {
        planet: 'neptune', sign: 'gemini',
        headline: 'A long generation that idealised the word.',
        core: [
            'Neptune in Gemini blurs the line between information and truth. The collective faith is in communication itself, and the matching illusion is that saying a thing well is the same as the thing being so.',
            'Cultural rather than individual. Its house and aspects make it specific.',
        ],
    },
    {
        planet: 'neptune', sign: 'cancer',
        headline: 'A long generation that idealised home.',
        core: [
            'Neptune in Cancer dissolves the boundary around family and belonging. The shared dream is of the safe hearth, held with real tenderness, and the illusion is a nostalgia for a version of home that was never quite like that.',
            'A generational atmosphere. The house and aspects are what individualise it.',
        ],
    },
    {
        planet: 'neptune', sign: 'leo',
        headline: 'A long generation that idealised the self expressed.',
        core: [
            'Neptune in Leo puts the dissolving function on individual brilliance. The collective romance is the star, the artist, the person who becomes themselves in public, and the illusion is that being seen is the same as being known.',
            'A fourteen-year tone rather than a trait. Its house and aspects are the personal part.',
        ],
    },
    {
        planet: 'neptune', sign: 'virgo',
        headline: 'A long generation that idealised purity and method.',
        core: [
            'Neptune in Virgo softens the edges around service, work and correctness. The shared aspiration is toward the clean and the properly done, and the accompanying illusion is that enough refinement will eventually make something perfect.',
            'Cultural weather. The house and aspects carry the individual meaning.',
        ],
    },
    {
        planet: 'neptune', sign: 'libra',
        headline: 'A long generation that idealised the perfect partnership.',
        core: [
            'Neptune in Libra dissolves boundaries around relating. The collective dream is of the union that completes both people, held sincerely, and the matching illusion is that the right partner resolves what was actually an internal question.',
            'A generational signature. Its house and aspects make it yours.',
        ],
    },
    {
        planet: 'neptune', sign: 'scorpio',
        headline: 'A long generation that idealised depth and transformation.',
        core: [
            'Neptune in Scorpio blurs the line around power, intimacy and the hidden. The shared fascination is with what lies underneath, and the illusion is that intensity is the same as truth.',
            'Cultural rather than personal. The house and aspects are the specific part.',
        ],
    },
    {
        planet: 'neptune', sign: 'sagittarius',
        headline: 'A long generation that idealised meaning itself.',
        core: [
            'Neptune in Sagittarius dissolves the boundaries around belief. The collective longing is for something large enough to explain everything, and the illusion is that certainty about the large question makes the small ones unnecessary.',
            'A fourteen-year tone. Its house and aspects individualise it.',
        ],
    },
    {
        planet: 'neptune', sign: 'capricorn',
        headline: 'A long generation that idealised structure and legitimacy.',
        core: [
            'Neptune in Capricorn softens the edges around authority and achievement. The shared dream is of the institution that actually works and the position that actually means something, and the illusion is that the structure itself will confer the substance.',
            'Generational atmosphere. The house and aspects are the personal component.',
        ],
    },
    {
        planet: 'neptune', sign: 'aquarius',
        headline: 'A long generation that idealised the collective.',
        core: [
            'Neptune in Aquarius dissolves boundaries around the group and the network. The shared aspiration is toward a genuinely connected humanity, and the illusion is that connection at scale is the same as connection.',
            'A period tone rather than a trait. Its house and aspects make it specific.',
        ],
    },
    {
        planet: 'neptune', sign: 'pisces',
        headline: 'Neptune in its own sign: a long generation soaked in the immaterial.',
        core: [
            'Neptune rules Pisces, and here the dissolving function runs on its own ground. The collective tone is permeable - imaginative, compassionate, and correspondingly poor at telling the real thing from the wished-for one.',
            'This describes fourteen years of cultural weather. What makes it yours is where it sits and what it touches.',
        ],
    },
];
const pluto = [
    {
        planet: 'pluto', sign: 'aries',
        headline: 'A generation that remade the meaning of individual will.',
        core: [
            'Pluto in Aries drives transformation through raw self-assertion. The generational theme is the individual as an irreducible force, and the shadow is the willingness to break things that did not need breaking.',
            'Pluto sits in a sign for between twelve and thirty years. This is the deepest and slowest layer of collective change, and only its house and aspects say anything about you.',
        ],
    },
    {
        planet: 'pluto', sign: 'taurus',
        headline: 'A generation that remade the meaning of ownership.',
        core: [
            'Pluto in Taurus transforms the relationship to land, money and material security, usually by force and usually over decades. The theme is that what a society treats as solid gets torn up and rebuilt.',
            'A very slow generational layer. The house it occupies and the aspects it makes are the individual part.',
        ],
    },
    {
        planet: 'pluto', sign: 'gemini',
        headline: 'A generation that remade how knowledge circulated.',
        core: [
            'Pluto in Gemini transforms communication at the level of infrastructure - who can speak, how far it carries, and what that does to power. The shadow is the weaponising of information.',
            'Generational depth rather than personal character. Its house and aspects are what individualise it.',
        ],
    },
    {
        planet: 'pluto', sign: 'cancer',
        headline: 'A generation that remade family and nation.',
        core: [
            'Pluto in Cancer transforms belonging at its roots: the family, the homeland, the idea of where one is from. The shadow is the defence of the tribe taken to its most destructive conclusion.',
            'A decades-long collective layer. The house and aspects carry the personal meaning.',
        ],
    },
    {
        planet: 'pluto', sign: 'leo',
        headline: 'A generation that remade the meaning of the individual self.',
        core: [
            'Pluto in Leo transforms personal identity into something to be asserted rather than inherited. The theme is the sovereign self; the shadow is a self-regard that struggles to see past itself.',
            'Generational. Only its house and aspects speak to your particular chart.',
        ],
    },
    {
        planet: 'pluto', sign: 'virgo',
        headline: 'A generation that remade work, health and the body.',
        core: [
            'Pluto in Virgo transforms the ordinary machinery of living - labour, medicine, the routines a life is made of. The shadow is a perfectionism applied at scale, with real human cost.',
            'A collective layer. The house and aspects are the individual component.',
        ],
    },
    {
        planet: 'pluto', sign: 'libra',
        headline: 'A generation that remade the terms of partnership.',
        core: [
            'Pluto in Libra transforms relationship itself: what a marriage is, what equality requires, and what happens when the old arrangement will no longer hold. The shadow is the power struggle conducted in the language of fairness.',
            'Generational rather than personal. Its house and aspects make it specific to you.',
        ],
    },
    {
        planet: 'pluto', sign: 'scorpio',
        headline: 'Pluto in its own sign: a generation that went into the dark deliberately.',
        core: [
            'Pluto rules Scorpio, and here the transforming function operates on its own ground - power, mortality, the hidden and the taboo. The generational theme is an unflinching willingness to look at what was previously unspeakable.',
            'This is collective and very deep. Only the house and aspects make it yours.',
        ],
    },
    {
        planet: 'pluto', sign: 'sagittarius',
        headline: 'A generation that remade belief and its institutions.',
        core: [
            'Pluto in Sagittarius transforms what a culture holds as true: religion, ideology, the frameworks used to justify everything else. The shadow is conviction hardened into something that permits anything.',
            'A generational layer. The house and aspects are where it becomes personal.',
        ],
    },
    {
        planet: 'pluto', sign: 'capricorn',
        headline: 'A generation that remade authority and the structures holding it.',
        core: [
            'Pluto in Capricorn transforms institutions, hierarchy and legitimacy, generally by exposing what was rotten in them. The theme is that the structures inherited will not survive intact.',
            'Collective and slow. Its house and aspects carry whatever is individual.',
        ],
    },
    {
        planet: 'pluto', sign: 'aquarius',
        headline: 'A generation that remade the collective itself.',
        core: [
            'Pluto in Aquarius transforms how large numbers of people are organised, connected and controlled. The theme is the network as the new seat of power; the shadow is the individual disappearing into it.',
            'Generational. The house and aspects are the personal part.',
        ],
    },
    {
        planet: 'pluto', sign: 'pisces',
        headline: 'A generation that remade the boundary of the self.',
        core: [
            'Pluto in Pisces transforms the immaterial: faith, imagination, and the sense of where one person ends. The theme is dissolution as a route to something else, and the shadow is a loss of the distinction between compassion and self-erasure.',
            'A very slow collective layer. Only its house and aspects say anything specific about you.',
        ],
    },
];
export const OUTER_PLANET_PLACEMENTS = [...uranus, ...neptune, ...pluto].map((entry) => placementUnit({ ...entry, generational: true }));
