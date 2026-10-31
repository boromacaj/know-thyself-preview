import { body, node } from './vocabulary.js?v=f9ab0a6';
/*
 * HUMAN DESIGN LABELS.
 *
 * Type / Strategy / Authority / Definition / Profile are the NAMES OF ROWS and
 * read in Slovak. What they hold does not: `Manifesting Generator`, `Sacral`,
 * `5/1` and the gate and channel numbers stay exactly as every other Human
 * Design source writes them, which is what keeps the reading checkable.
 *
 * The same line is drawn twice more, and both times the same way round:
 *
 *  - `Personality` and `Design` are the two SIDES of a chart, and every Human
 *    Design source calls them that, so they stay - `Personality: Slnko`. The
 *    limitations already read this way ("Moment Design", "Slnkom Personality"),
 *    and a Slovak word for them would leave the reader unable to match this
 *    appendix to any book.
 *  - The nine CENTRES - Head, Ajna, Throat, G / Identity, Ego / Heart, Solar
 *    Plexus, Sacral, Spleen, Root - are names too, and are absent from both
 *    tables below on purpose. `Motor spojený s centrom Throat` says the Slovak
 *    part in Slovak and leaves the centre alone.
 *
 * Most of this pillar's rows are GENERATED - one per activated body, per side,
 * per arrow - so the patterns carry more of the pillar than the table does.
 * Each returns null unless it can say ALL of a label, so a half-Slovak row like
 * `Brána 34 Sacral` can never be produced from a part this file does not know.
 */
export const HUMAN_DESIGN_LABELS = {
    Type: 'Typ',
    Strategy: 'Stratégia',
    Authority: 'Autorita',
    Definition: 'Definícia',
    Profile: 'Profil',
    Background: 'Pozadie',
    'Incarnation Cross': 'Inkarnačný kríž',
    'Defined centers': 'Definované centrá',
    'Undefined centers': 'Nedefinované centrá',
    Channels: 'Kanály',
    Gates: 'Brány',
    /* ------------------------------------------------------ group headings -- */
    'Human Design summary': 'Súhrn Human Designu',
    'Center states': 'Stavy centier',
    'Variables (four arrows)': 'Premenné (štyri šípky)',
    'Personality activations': 'Aktivácie Personality',
    'Design activations': 'Aktivácie Design',
    'Human Design calculation trace': 'Výpočtová stopa Human Designu',
    /* Raised instead of the trace when the birth moment cannot be normalised. */
    'Human Design readiness trace': 'Stopa pripravenosti Human Designu',
    /* The whole-day envelope's appendix (model.ts, envelopeHumanDesignTechnical). */
    'Activations across the birth date': 'Aktivácie počas dňa narodenia',
    'How the birth date was scanned': 'Ako sa preveril deň narodenia',
    'Birth time': 'Čas narodenia',
    Window: 'Okno',
    Stretches: 'Úseky',
    'Instants evaluated': 'Vyhodnotené okamihy',
    'Defined channels all day': 'Kanály definované celý deň',
    'Channels at some hours only': 'Kanály len v niektorých hodinách',
    'Gates activated all day': 'Brány aktivované celý deň',
    'Gates at some hours only': 'Brány len v niektorých hodinách',
    Mechanics: 'Mechanika',
    /* ------------------------------------------------------- the two moments -- */
    /* Both values are a full ISO instant, not a date, and the limitations
       already call it "Moment Design" - so does the row. */
    'Personality UTC': 'Moment Personality v UTC',
    'Design UTC': 'Moment Design v UTC',
    'Design Date': 'Moment Design',
    'Design offset days': 'Posun Design v dňoch',
    'Design solver iterations': 'Iterácie výpočtu Design',
    'Design Sun residual': 'Zvyšková odchýlka Slnka (Design)',
    'Personality Sun longitude': 'Dĺžka Slnka (Personality)',
    'Target Design Sun longitude': 'Cieľová dĺžka Slnka (Design)',
    /* `Frame` is deliberately absent: both this engine and BaZi emit that row,
       i18n/labels/bazi.ts already names it `Rámec výpočtu`, and a second entry
       here would silently win over it - this table is spread last - and leave the
       two appendices calling the same row two different things. */
    /* --------------------------------------------------------- the lunar node -- */
    /* `Lunar node model` is the astrology engine's row as well, and
       i18n/labels/westernAstrology.ts already names it, so it is not repeated
       here. Only the note beside it is this pillar's own. */
    'Lunar node convention note': 'Poznámka ku konvencii lunárneho uzla',
    /* ------------------------------------------------- gates, channels, centres -- */
    /* The engine writes these lower case in its trace and the pillar writes them
       capitalised as key outputs. Both spellings are the same row to a reader. */
    'Activated gates': 'Aktivované brány',
    'Activated Gates': 'Aktivované brány',
    'Defined channels': 'Definované kanály',
    'Defined Channels': 'Definované kanály',
    'Defined Centers': 'Definované centrá',
    /* The reading spells the centres the British way in its glance strip. */
    'Defined centres': 'Definované centrá',
    'Open Centers': 'Otvorené centrá',
    'Open centres': 'Otvorené centrá',
    'Definition groups': 'Skupiny definície',
    /* ------------------------------------------------------- the motor to Throat -- */
    'Motor connected to Throat': 'Motor spojený s centrom Throat',
    'Motor-to-Throat path': 'Cesta motora k centru Throat',
    'Motor to Throat': 'Motor k centru Throat',
    /* --------------------------------------------------- signature and not-self -- */
    /* `Signature` is the system's word for the felt marker of following the
       Strategy, and the Slovak reading calls that marker `znak`. The English is
       kept in brackets, the way `celé znamenia (Whole Sign)` keeps its name, so
       the row can still be matched to a Human Design source. `Not-Self` is a
       name and does not move; `theme` is an ordinary word and does. */
    Signature: 'Znak (Signature)',
    'Not-Self theme': 'Téma Not-Self',
    'Not-Self Theme': 'Téma Not-Self',
    'Not-self theme': 'Téma Not-Self',
    /* -------------------------------------------------------- incarnation cross -- */
    Angle: 'Uhol',
    'Angle source': 'Zdroj uhla',
    'Incarnation Cross angle source': 'Zdroj uhla inkarnačného kríža',
    'Gate notation': 'Zápis brán',
    'Named cross title': 'Názov kríža',
    /* ------------------------------------------------------------- variables -- */
    Variables: 'Premenné',
};
/* The four arrows by their position on the BodyGraph, not by a translated name
   for the position: `top-left` is where the arrow sits, and Slovak says the
   vertical half first. */
const ARROW = {
    'top-left': 'vľavo hore',
    'top-right': 'vpravo hore',
    'bottom-left': 'vľavo dole',
    'bottom-right': 'vpravo dole',
};
/*
 * The four Variables as the reading already writes them.
 *
 * limitationText.ts ships the same four in Slovak inside a sentence - "pre
 * stravu, prostredie, motiváciu a perspektívu" - so the row labels follow it
 * rather than inventing a second vocabulary. The PHS variant names, which this
 * engine deliberately does not assert, are a different thing and stay English
 * wherever they appear as values.
 */
const VARIABLE = {
    'Determination (Digestion)': 'Determinácia (trávenie)',
    Environment: 'Prostredie',
    Motivation: 'Motivácia',
    'Perspective (View)': 'Perspektíva (pohľad)',
};
/*
 * The two bodies the Incarnation Cross names, in the genitive.
 *
 * `Brána Slnka` needs the genitive and vocabulary.ts holds only the nominative,
 * so the two forms this pillar actually asks for live here. Anything else
 * returns null and the row stays English rather than half-declined.
 */
const BODY_GENITIVE = {
    Sun: 'Slnka',
    Earth: 'Zeme',
};
/** `Sun`, `North Node`, `Earth` - a body as an activation row names it. */
const activationBody = (english) => (body(english) ?? node(english) ?? (english === 'Earth' ? 'Zem' : null));
/*
 * THE SIXTY-FOUR GATE NAMES.
 *
 * `knowledge/human-design/hdGates.ts` builds `Gate 32 — What will last`, and
 * that whole string is also the KEY the composer and the technical notes look a
 * gate up by, so the name cannot be translated where it is written. It is
 * translated here instead, at the last moment before a reader sees it.
 *
 * These are titles, not definitions: one short line sitting above the paragraph
 * that explains it. So `Čo vydrží`, not a sentence about staying power. The
 * NUMBER is the durable identifier and never moves.
 *
 * Keyed by the English name exactly as hdGates.ts writes it - not by the gate
 * number - so a name edited at source falls out of this table and the pattern
 * returns null rather than pairing a Slovak title with a gate that has been
 * renamed under it.
 */
const GATE_NAME = {
    'Self-expression': 'Vyjadrenie seba',
    Direction: 'Smer',
    'Beginning in difficulty': 'Začiatok v ťažkostiach',
    'The answer offered': 'Ponúknutá odpoveď',
    Rhythm: 'Rytmus',
    'Friction at the boundary': 'Trenie na hranici',
    'The role in front': 'Rola vpredu',
    Contribution: 'Prínos',
    'The detail held': 'Udržaný detail',
    'Behaving as yourself': 'Správanie podľa seba',
    Ideas: 'Nápady',
    'Caution before speaking': 'Opatrnosť pred slovom',
    'The listener': 'Poslucháč',
    'Fuel for direction': 'Palivo pre smer',
    Range: 'Rozpätie',
    Enthusiasm: 'Nadšenie',
    'The opinion': 'Názor',
    Correction: 'Náprava',
    'What is needed': 'Čo je potrebné',
    'The present moment': 'Prítomná chvíľa',
    'Control of resources': 'Kontrola nad zdrojmi',
    Grace: 'Pôvab',
    'Saying the unsayable': 'Povedať nevypovedateľné',
    'Returning to the question': 'Návrat k otázke',
    'Impersonal love': 'Neosobná láska',
    'Persuasion from memory': 'Presviedčanie z pamäti',
    Caring: 'Starostlivosť',
    'Struggle for meaning': 'Zápas o zmysel',
    'The wholehearted yes': 'Áno celým srdcom',
    Desire: 'Túžba',
    'Speaking for others': 'Hovoriť za druhých',
    'What will last': 'Čo vydrží',
    'Retreat and retelling': 'Ústup a prerozprávanie',
    Power: 'Sila',
    'Having done it': 'Mať to za sebou',
    'The crisis before the new': 'Kríza pred novým',
    'The bargain': 'Dohoda',
    'Standing your ground': 'Stáť si za svojím',
    Provocation: 'Provokácia',
    'Delivering your part': 'Splniť svoju časť',
    'The start of feeling': 'Začiatok citu',
    'Seeing it through': 'Dotiahnuť to do konca',
    'The inner knowing': 'Vnútorné poznanie',
    'Instinctive recognition': 'Inštinktívne rozpoznanie',
    'The one who directs': 'Ten, kto riadi',
    'Being in the right place': 'Byť na správnom mieste',
    'Making sense of it': 'Dať tomu zmysel',
    Depth: 'Hĺbka',
    'The terms revised': 'Prehodnotené podmienky',
    Values: 'Hodnoty',
    Shock: 'Otras',
    Stillness: 'Nehybnosť',
    Starting: 'Začínanie',
    Ambition: 'Ctižiadosť',
    Mood: 'Nálada',
    'The story': 'Príbeh',
    'The quiet signal': 'Tichý signál',
    Vitality: 'Vitalita',
    'The barrier': 'Bariéra',
    Limitation: 'Obmedzenie',
    'The unanswerable question': 'Nezodpovedateľná otázka',
    'The detail that supports it': 'Detail, ktorý to podopiera',
    Doubt: 'Pochybnosť',
    'The unresolved picture': 'Nedoskladaný obraz',
};
/*
 * THE THIRTY-SIX CHANNEL NAMES.
 *
 * Same arrangement as the gates above: `knowledge/human-design/hdChannels.ts`
 * builds `Channel 20-57 — Knowing in the moment, and saying it`, the gate pair
 * is the identifier every other source uses, and only the descriptive half
 * moves. Where a name states two halves of a connection the Slovak keeps both,
 * because that pairing is what the channel actually is.
 *
 * No centre name appears in any of these, which is deliberate at source - the
 * channel entries name the centres in their prose instead of their titles - so
 * nothing here has to leave a `Throat` or a `Sacral` standing.
 */
const CHANNEL_NAME = {
    'Distinct contribution': 'Osobitý prínos',
    'Direction and fuel': 'Smer a palivo',
    'Starting against resistance': 'Začínanie proti odporu',
    'Doubt and the answer to it': 'Pochybnosť a odpoveď na ňu',
    'Rhythm and its interruption': 'Rytmus a jeho narušenie',
    'Intimacy and the barrier to it': 'Blízkosť a bariéra pred ňou',
    'Leading by being asked': 'Viesť, keď ťa o to požiadajú',
    'Focus held still': 'Nehybné sústredenie',
    'Being yourself, out loud, now': 'Byť sebou, nahlas, teraz',
    'Conviction with power behind it': 'Presvedčenie so silou za ním',
    'Instinct about your own survival': 'Inštinkt pre vlastné prežitie',
    'Ideas looking for a listener': 'Nápady, ktoré hľadajú poslucháča',
    'Mood into voice': 'Nálada v hlase',
    'Holding what others tell you': 'Nosiť, čo ti druhí zveria',
    'Depth becoming skill': 'Z hĺbky sa stáva zručnosť',
    'Opinion with the detail to back it': 'Názor podložený detailom',
    'Improving what is not right': 'Zlepšovať, čo nie je v poriadku',
    'Needing and the terms of it': 'Potreba a jej podmienky',
    'Busy in the present': 'Zaneprázdnený v prítomnosti',
    'Knowing in the moment, and saying it': 'Vedieť v okamihu a povedať to',
    'Control of the material': 'Kontrola nad hmotným',
    'Insight that has to be translated': 'Vhľad, ktorý treba preložiť',
    'The question that will not close': 'Otázka, ktorá sa nezavrie',
    'Shock into something larger': 'Otras do niečoho väčšieho',
    'Memory turned into persuasion': 'Pamäť premenená na presviedčanie',
    'Care and what it costs': 'Starostlivosť a jej cena',
    'Struggle that means something': 'Zápas, ktorý má zmysel',
    'Committing without knowing where it goes': 'Zaviazať sa bez toho, aby bolo jasné, kam to vedie',
    'Wanting more than is available': 'Chcieť viac, než je k dispozícii',
    'Ambition and the fear under it': 'Ctižiadosť a strach pod ňou',
    'Power guided by instinct': 'Sila vedená inštinktom',
    'Appetite for experience': 'Chuť na zážitky',
    'The bargain in a relationship': 'Dohoda vo vzťahu',
    'Provocation and mood': 'Provokácia a nálada',
    'Finishing what was started': 'Dokončiť, čo sa začalo',
    'Making sense of what happened': 'Dať zmysel tomu, čo sa stalo',
};
export const HUMAN_DESIGN_PATTERNS = [
    /* An entity title as the reading prints it above the paragraph explaining it:
       `Gate 32 — What will last`, `Channel 20-57 — Knowing in the moment, and
       saying it`. The number and the em dash are kept exactly; only the name is
       said in Slovak, and only when this file knows it - an unknown name returns
       null so a title can never come out half translated as `Brána 32 — What will
       last`. */
    [/^Gate (\d+) — (.+)$/, (m) => {
            const name = GATE_NAME[m[2]];
            return name ? `Brána ${m[1]} — ${name}` : null;
        }],
    [/^Channel ([\d-]+) — (.+)$/, (m) => {
            const name = CHANNEL_NAME[m[2]];
            return name ? `Kanál ${m[1]} — ${name}` : null;
        }],
    /* The four gates of the Incarnation Cross: `Personality Sun gate`. Listed
       before the activation rows below, which would otherwise take the line and
       fail to translate `Sun gate` as a body. */
    [/^(Personality|Design) (Sun|Earth) gate$/, (m) => {
            const gate = BODY_GENITIVE[m[2]];
            return gate ? `Brána ${gate} (${m[1]})` : null;
        }],
    /* The calculation trace's own name for an arrow: `Variable top-left
       Determination (Digestion)`. */
    [/^Variable (top-left|top-right|bottom-left|bottom-right) (.+)$/, (m) => {
            const arrow = ARROW[m[1]];
            const variable = VARIABLE[m[2]];
            return arrow && variable ? `Premenná ${arrow}: ${variable}` : null;
        }],
    /* The appendix's name for the same arrow, which puts the position last:
       `Determination (Digestion) (top-left)`. */
    [/^(.+) \((top-left|top-right|bottom-left|bottom-right)\)$/, (m) => {
            const variable = VARIABLE[m[1]];
            const arrow = ARROW[m[2]];
            return variable && arrow ? `${variable} (${arrow})` : null;
        }],
    /* One activation, side first: `Personality Sun`, `Design North Node`. The
       colon is how this appendix already writes a named row - `Postavenie v dome:
       Jupiter` - and it keeps the side readable as the name it is. */
    [/^(Personality|Design) (.+)$/, (m) => {
            const named = activationBody(m[2]);
            return named ? `${m[1]}: ${named}` : null;
        }],
    /* A bare body, which is how the two activation groups label their rows once
       the side is already in the heading above them. `Earth` reaches the BaZi
       phase pattern first and comes back `Zem` either way; it is named here too
       so this pillar does not depend on that. */
    [/^(Sun|Moon|Mercury|Venus|Mars|Jupiter|Saturn|Uranus|Neptune|Pluto|Earth|North Node|South Node)$/,
        (m) => activationBody(m[1])],
];
